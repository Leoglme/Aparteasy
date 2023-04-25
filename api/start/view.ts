import View from '@ioc:Adonis/Core/View'
import appInfos from 'Config/app-infos'

/* Global view functions */
View.global('lightOrDarkColor', (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const B = ((num >> 8) & 0x00ff) + amt
  const G = (num & 0x0000ff) + amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  )
})

/* Global view variables */
View.global('app_name', appInfos.name)
View.global('primary_color', appInfos.color)
View.global('app_logo', appInfos.logo)
View.global('support_mail', appInfos.emails.support)
View.global('app_domain', appInfos.domain)
View.global('year', new Date().getFullYear())
