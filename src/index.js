import './styles/global.scss';

import { openGameStartModal } from './scripts/dom-helpers';
import domSetup from './scripts/dom-setup';
// Allow dist on git for vercel

domSetup();
openGameStartModal();
