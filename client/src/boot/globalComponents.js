import { boot } from 'quasar/wrappers'
import Btn from '../components/~Global/Buttons/Btn'
import BtnLink from '../components/~Global/Buttons/BtnLink'
import NothingHere from '../components/~Global/NothingHere/NothingHere'
import AppDialog from '../components/~Global/AppDialog/AppDialog'
import AppDialogInput from '../components/~Global/AppDialog/AppDialogInput'
import AppDialogCheckbox from '../components/~Global/AppDialog/AppDialogCheckbox'

export default boot(async ({ app }) => {
  app.component('btn', Btn)
  app.component('btn-link', BtnLink)
  app.component('nothing-here', NothingHere)
  app.component('app-dialog', AppDialog)
  app.component('app-dialog-input', AppDialogInput)
  app.component('app-dialog-checkbox', AppDialogCheckbox)
})
