<template lang="pug">
v-container.py-0
  v-row.d-flex.flex-row.justify-center
    // メールテーマ
    v-col(cols="12")
      div.bg-red.rounded-pill.ma-auto.text-center.form-title(
        style="height: 30px width: 70vw max-width: 400px"
      ) {{ $t('pages.users.form.mail_theme') }}
    v-col(cols="12")
      v-select(
        width="80vw"
        max-width="400px"
        prepend-icon="mdi-email-outline"
        :items="mailTheme"
        variant="underlined"
      )

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
          placeholder="markdown形式で説明を記述できます"
          maxlength="300"
        )

    // 添付ファイル
    v-col(cols="12")
      div.bg-red.rounded-pill.ma-auto.text-center.form-title(
        style="height: 30px width: 70vw max-width: 400px"
      ) {{ $t('pages.users.form.attachment') }}
    v-col(cols="12")
      v-file-input(
        variant="underlined"
      )
    v-col.d-flex.flex-row.justify-space-evenly
      // 戻る
      v-btn.form-button__title(
        color="grey"
        rounded="pill"
        height="40px"
        :to="`/users/${lineId}`"
      ) {{ $t('button.back') }}
      // 送信する
      v-btn.form-button__title(
        color="green"
        rounded="pill"
        height="40px"
        @click="dialog.sendForm = true"
      ) {{ $t('button.send') }}

// 送信確認
dialog-send-form(
  v-model="dialog.sendForm"
  @ok="submit"
)
</template>

<script setup lang="ts">
import type EasyMde from "easymde"
let mde: InstanceType<typeof EasyMde> | null = null

const route = useRoute()
const lineId = route.params.id

const {
  mailTheme,
  getMailTheme,
  createOtayori
} = useDatabase()

// ref
const form = ref({
  title: '',
  lineId: '',
  children: {}
})
const dialog = ref({
  sendForm: false
})
const content = ref("")
const contentArea = ref()

// methods
const submit = async() => {
  const block = useMdToNotion(content.value)
  form.value.children = block
  await createOtayori(unref(form))
  dialog.value.sendForm = false
  navigateTo(`/users/${lineId}`)
}

onMounted(async () => {
  await getMailTheme() // メールテーマの取得

  // easeMde の初期化
  const EasyMde = (await import("easymde")).default
  mde = new EasyMde({
    element: contentArea.value.$el,
    autosave: {            //自動保存
      enabled: true,
      delay: 1000,
      uniqueId: 'mde-autosave' //ローカルストレージのキーに使用
    },
  })
  mde.codemirror.on("change", () => {
    if (mde) {
      content.value = mde.value()
    }
  })
})
</script>

<style scoped lang="sass">
.form-title
  font-size: 18px

.form-button__title
  font-size: 20px
</style>