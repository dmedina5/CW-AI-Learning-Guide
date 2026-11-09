/**
 * Harbor stand-in for src/lib/claude-app-shots.ts. The Apps Script frame
 * showed every github.io screenshot as a broken image, so the Harbor build
 * carries them inside the bundle instead: vite.config.ts inlines every
 * imported asset (assetsInlineLimit), turning each import into a data: URL.
 */
import artifactsView from '../../images/claude-app/artifacts-view.jpg';
import chatGroups from '../../images/claude-app/chat-groups.jpg';
import customizeSkills from '../../images/claude-app/customize-skills.jpg';
import effortMenu from '../../images/claude-app/effort-menu.jpg';
import modelPicker from '../../images/claude-app/model-picker.jpg';
import projects from '../../images/claude-app/projects.jpg';

const SHOTS: Record<string, string> = {
  'artifacts-view.jpg': artifactsView,
  'chat-groups.jpg': chatGroups,
  'customize-skills.jpg': customizeSkills,
  'effort-menu.jpg': effortMenu,
  'model-picker.jpg': modelPicker,
  'projects.jpg': projects,
};

export function shotSrc(file: string): string {
  const src = SHOTS[file];
  if (!src) throw new Error(`No inlined Claude app screenshot named ${file}`);
  return src;
}
