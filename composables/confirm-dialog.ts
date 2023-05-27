import { createApp } from 'vue';
import ConfirmDialog from '~/components/dialog/confirm.vue';

export type ConfirmDialogOptions = {
  title: string
  description: string
}

export function confirm(options: ConfirmDialogOptions): Promise<boolean> {
  const htmlIdentifier = 'confirm-container'

  const confirmContainer = document.createElement('div')
  confirmContainer.setAttribute('id', htmlIdentifier)
  document.body.appendChild(confirmContainer)

  return new Promise((resolve) => {
    const vueInstance = createApp(ConfirmDialog, options)
    vueInstance.mount(`#${htmlIdentifier}`)

    const clean = () => {
      vueInstance.unmount()
      document.body.removeChild(confirmContainer)

      return true
    }

    confirmContainer?.addEventListener('confirm', () => clean() && resolve(true))
    confirmContainer?.addEventListener('cancel', () => clean() && resolve(false))
  })
}
