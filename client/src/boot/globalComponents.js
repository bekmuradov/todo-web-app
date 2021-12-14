import { boot } from 'quasar/wrappers'
import Btn from '../components/~Global/Buttons/Btn'
import BtnLink from '../components/~Global/Buttons/BtnLink'
import NothingHere from '../components/~Global/NothingHere/NothingHere'
import AppDialog from '../components/~Global/AppDialog/AppDialog'
import AppInput from '../components/~Global/FormComponents/AppInput'
import AppCheckboxWithLabel from '../components/~Global/FormComponents/AppCheckboxWithLabel'

export default boot(async ({ app }) => {
  app.component('btn', Btn)
  app.component('btn-link', BtnLink)
  app.component('nothing-here', NothingHere)
  app.component('app-dialog', AppDialog)
  app.component('app-input', AppInput)
  app.component('app-checkbox-with-label', AppCheckboxWithLabel)
})
