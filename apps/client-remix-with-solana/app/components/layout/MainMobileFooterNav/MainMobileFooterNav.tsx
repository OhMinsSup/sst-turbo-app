import { ButtonGroup } from '~/components/layout/ButtonGroup';
import { NAV_CONFIG } from '~/constants/navigation';

export default function MainMobileFooterNav() {
  return (
    <nav className="dark:bg-background fixed bottom-0 z-40 flex w-full items-center justify-around border-t bg-white py-2 dark:border-slate-800 dark:text-slate-300 sm:hidden">
      {NAV_CONFIG.mainNav.map((item, index) => (
        <div key={index} className="relative w-max">
          <ButtonGroup key={index} item={item} type="footer" />
        </div>
      ))}
    </nav>
  );
}
