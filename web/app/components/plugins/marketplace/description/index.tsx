import {
  getLocaleOnServer,
  useTranslation as translate,
} from '@/i18n/server'

type DescriptionProps = {
  locale?: string
}
const Description = async ({
  locale: localeFromProps,
}: DescriptionProps) => {
  const localeDefault = getLocaleOnServer()
  const { t } = await translate(localeFromProps || localeDefault, 'plugin')

  return (
    <>
      <h1 className='shrink-0 mb-2 text-center title-4xl-semi-bold text-text-primary'>
        {t('marketplace.empower')}
      </h1>
      <h2 className='shrink-0 flex justify-center items-center text-center body-md-regular text-text-tertiary'>
        {t('marketplace.discover')}
        <span className="relative ml-1 body-md-medium text-text-secondary after:content-[''] after:absolute after:left-0 after:bottom-[1.5px] after:w-full after:h-2 after:bg-text-text-selected">
          {t('category.models')}
        </span>
        ,
        <span className="relative ml-1 body-md-medium text-text-secondary after:content-[''] after:absolute after:left-0 after:bottom-[1.5px] after:w-full after:h-2 after:bg-text-text-selected">
          {t('category.tools')}
        </span>
        ,
        <span className="relative ml-1 mr-1 body-md-medium text-text-secondary after:content-[''] after:absolute after:left-0 after:bottom-[1.5px] after:w-full after:h-2 after:bg-text-text-selected">
          {t('category.extensions')}
        </span>
        {t('marketplace.and')}
        <span className="relative ml-1 mr-1 body-md-medium text-text-secondary after:content-[''] after:absolute after:left-0 after:bottom-[1.5px] after:w-full after:h-2 after:bg-text-text-selected">
          {t('category.bundles')}
        </span>
        {t('marketplace.inDifyMarketplace')}
      </h2>
    </>
  )
}

export default Description