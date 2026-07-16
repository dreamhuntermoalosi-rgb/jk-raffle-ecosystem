'use client';

import { PublicHome } from './views/home';
import { PublicCampaigns } from './views/campaigns';
import { PublicWinners } from './views/winners';
import { PublicAbout } from './views/about';
import { PublicHowItWorks } from './views/how-it-works';
import { PublicFAQ } from './views/faq';
import { PublicContact } from './views/contact';
import { PublicLogin } from './views/login';
import { PublicPrivacy } from './views/privacy';
import { PublicTerms } from './views/terms';
import { PublicHeader } from './public-header';
import { PublicFooter } from './public-footer';
import { useAppStore } from '@/stores/app-store';

const views: Record<string, React.ComponentType> = {
  home: PublicHome,
  campaigns: PublicCampaigns,
  winners: PublicWinners,
  about: PublicAbout,
  'how-it-works': PublicHowItWorks,
  faq: PublicFAQ,
  contact: PublicContact,
  login: PublicLogin,
  privacy: PublicPrivacy,
  terms: PublicTerms,
};

export function PublicPortal() {
  const { currentView } = useAppStore();
  const ViewComponent = views[currentView] || PublicHome;

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <div className="page-enter">
          <ViewComponent />
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}