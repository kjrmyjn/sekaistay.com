import { FOOTER_CATCH } from '@/content/home/copy'

export default function FooterCatch() {
  return (
    <section className="bg-white border-t border-light-gray">
      <div className="max-w-[880px] mx-auto px-5 md:px-10 py-12 md:py-16 text-center">
        <p className="text-[17px] md:text-[19px] font-bold text-charcoal leading-[1.9]">
          {FOOTER_CATCH.body}
        </p>
      </div>
    </section>
  )
}
