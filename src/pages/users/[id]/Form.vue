<template lang="pug">
v-container.py-0
  v-overlay(
    :model-value="loading.init"
    :persistent="true"
    class="align-center justify-center"
  )
    v-progress-circular(
      color="primary"
      size="60"
      indeterminate
    )
  v-row.d-flex.flex-row.justify-center
    // メールテーマ
    v-col(cols="12")
      div.bg-red.rounded-pill.ma-auto.text-center.form-title(
        style="height: 30px width: 70vw max-width: 400px"
      ) {{ $t('pages.users.form.mail_theme') }}
    v-col(cols="12")
      v-select(
        v-model="form.theme"
        width="80vw"
        max-width="400px"
        prepend-icon="mdi-email-outline"
        :items="mailTheme"
        variant="underlined"
      )
      p.text-center.text-pre-wrap.border-lg.border-red.text-red.rounded-md.py-4(v-if="mailThemeNavigation") {{ mailThemeNavigation }}

    // 件名
    v-col(cols="12")
      div.bg-red.rounded-pill.ma-auto.text-center.form-title(
        style="height: 30px width: 70vw max-width: 400px"
      ) {{ $t('pages.users.form.mail_title') }}
    v-col(cols="12")
      v-text-field(
        v-model="form.title"
        variant="underlined"
        prepend-icon="mdi-format-text-variant-outline"
      )

    // 本文
    v-col(cols="12")
      div.bg-red.rounded-pill.ma-auto.text-center.form-title(
        style="height: 30px width: 70vw max-width: 400px"
      ) {{ $t('pages.users.form.content') }}
    v-col(cols="12")
      div
        textarea(
          ref="contentArea"
          v-model="content"
          rows="5"
          placeholder="markdown形式で本文を記述できます。"
          maxlength="300"
        )

    // 戻る・送信する
    v-col.d-flex.flex-row.justify-space-evenly
      v-btn.form-button__title(
        color="grey"
        rounded="pill"
        height="40px"
        :to="`/users/${userId}`"
      ) {{ $t('button.back') }}
      v-btn.form-button__title(
        color="green"
        rounded="pill"
        height="40px"
        :disabled="!form.theme || !form.title || !content"
        @click="dialog.sendForm = true"
      ) {{ $t('button.send') }}

// 送信確認
dialog-send-form(
  v-model="dialog.sendForm"
  :loading="loading.sendForm"
  @ok="submit"
)
// 送信完了
dialog-result-sending-form(
  v-model="dialog.resultSendingForm"
  :label="label.resultSendingForm"
  @ok="navigateToHome"
)
</template>

<script setup lang="ts">
import type EasyMde from 'easymde';
let mde: InstanceType<typeof EasyMde> | null = null;

const i18n = useI18n();
const config = useConfig();
const route = useRoute();
const userId = route.params.id;
const lineId = useState('lineId', () => ''); // line のユーザーID

const { mailTheme, getMailTheme, createOtayori } = useDatabase();

const { createTextMessage, createFlexMessage, pushMessages } = usePushMessage();

// ref
const form = ref({
  theme: '',
  title: '',
  userId: '',
  children: {},
});
const dialog = ref({
  sendForm: false,
  resultSendingForm: false,
});
const label = ref({
  resultSendingForm: '',
});
const loading = ref({
  sendForm: false,
  init: true,
});
const content = ref('');
const contentArea = ref();
const messages = ref(<{}>[]);

// computed
const mailThemeTitle = computed(() => {
  let title;
  if (mailTheme.value) {
    mailTheme.value.forEach((theme) => {
      if (theme.value === form.value.theme) title = theme.title;
    });
  }
  return title;
});
const mailThemeNavigation = computed(() => {
  let navigation;
  if (mailTheme.value) {
    mailTheme.value.forEach((theme) => {
      if (theme.value === form.value.theme) navigation = theme.navigation;
    });
  }
  return navigation;
});

// methods
const submit = async () => {
  loading.value.sendForm = true;
  if (!form.value.theme || !form.value.title) return;

  try {
    const block = useMdToNotion(content.value);
    form.value.children = block;
    form.value.userId = userId;

    await createOtayori(unref(form));

    config.remove('smde_mde-autosave');
    dialog.value.sendForm = false;
    label.value.resultSendingForm = i18n.t(
      'dialog.result_sending_form.navigation.success'
    );
    dialog.value.resultSendingForm = true;

    messages.value.push(
      createTextMessage(i18n.t('message.pushMessage.post_success'))
    );
    messages.value.push(
      (
        await createFlexMessage(
          mailThemeTitle.value,
          form.value.title,
          content.value
        )
      ).flexMessage
    );
    await pushMessages(lineId.value, messages.value);
  } catch (e: any) {
    console.log('エラー', e);

    label.value.resultSendingForm = i18n.t(
      'dialog.result_sending_form.navigation.error'
    );
    dialog.value.resultSendingForm = true;
  } finally {
    loading.value.sendForm = false;
  }
};

/**
 * ホームへ戻る
 */
const navigateToHome = () => navigateTo(`/users/${userId}`);

onMounted(async () => {
  try {
    await getMailTheme(); // メールテーマの取得
    if (route.query.theme) form.value.theme = route.query.theme;
  } finally {
    loading.value.init = false;
  }

  // easeMde の初期化
  const EasyMde = (await import('easymde')).default;
  mde = new EasyMde({
    element: contentArea.value.$el,
    autosave: {
      //自動保存
      enabled: true,
      delay: 1000,
      uniqueId: 'mde-autosave', //ローカルストレージのキーに使用
    },
  });
  content.value = mde.value(); // 自動保存されている文章を格納
  mde.codemirror.on('change', () => {
    if (mde) {
      content.value = mde.value();
    }
  });
});
</script>

<style scoped lang="sass">
.form-title
  font-size: 18px

.form-button__title
  font-size: 20px
</style>
