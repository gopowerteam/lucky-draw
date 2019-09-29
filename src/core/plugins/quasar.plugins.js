import Vue from 'vue'

import '~/assets/styles/quasar.styl'
import 'quasar/dist/quasar.ie.polyfills'
import lang from 'quasar/lang/zh-hans.js'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QDialog,
  QInput,
  QToggle,
  QCard,
  QCardSection,
  QCardActions,
  Notify,
  QScrollArea,
  QSeparator,
  QAvatar
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QDialog,
    QInput,
    QToggle,
    QCard,
    QCardActions,
    QCardSection,
    QSeparator,
    QScrollArea,
    QAvatar
  },
  directives: {},
  plugins: {
    Notify
  },
  lang: lang
})
