/**
 * Harbor stand-in for src/lib/site-images.ts. The Apps Script frame shows
 * images from other sites (github.io, coverwhale.com) as broken, so the
 * Harbor build carries them inside the bundle instead: vite.config.ts inlines
 * every imported asset (assetsInlineLimit), turning each import into a data:
 * URL. An image the guide uses must be listed here, or the build throws on it.
 */
import logo from '../../public/images/cover-whale-logo.png';
import artifactsView from '../../public/images/claude-app/artifacts-view.jpg';
import chatGroups from '../../public/images/claude-app/chat-groups.jpg';
import customizeSkills from '../../public/images/claude-app/customize-skills.jpg';
import effortMenu from '../../public/images/claude-app/effort-menu.jpg';
import modelPicker from '../../public/images/claude-app/model-picker.jpg';
import projects from '../../public/images/claude-app/projects.jpg';

const IMAGES: Record<string, string> = {
  'cover-whale-logo.png': logo,
  'claude-app/artifacts-view.jpg': artifactsView,
  'claude-app/chat-groups.jpg': chatGroups,
  'claude-app/customize-skills.jpg': customizeSkills,
  'claude-app/effort-menu.jpg': effortMenu,
  'claude-app/model-picker.jpg': modelPicker,
  'claude-app/projects.jpg': projects,
};

export function siteImage(path: string): string {
  const src = IMAGES[path];
  if (!src) throw new Error(`No inlined image named ${path} in gas/shims/site-images.ts`);
  return src;
}
