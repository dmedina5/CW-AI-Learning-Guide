import { Callout } from '@/components/content/Callout';
import { AI_HELP_CONTACT, CLAUDE_PLAN, CLAUDE_PLAN_WORKSPACE, LEGACY_CLAUDE_PLAN } from '@/lib/constants';

interface ClaudePlanNoticeProps {
  /** The one-paragraph version, for pages where sign-in is not the subject. */
  compact?: boolean;
  className?: string;
}

/**
 * Which Claude plan to use at Cover Whale, and how to check you are on it.
 * One component so every page that mentions signing in says the same thing.
 */
export function ClaudePlanNotice({ compact = false, className = '' }: ClaudePlanNoticeProps) {
  return (
    <Callout variant="sage" className={className}>
      <p className="text-base" style={{ color: 'var(--cw-ink-secondary)' }}>
        <strong>Use the {CLAUDE_PLAN}.</strong> Cover Whale is moving off the {LEGACY_CLAUDE_PLAN}{' '}
        plan, so do all new Claude work there: chats, projects, Cowork and Claude Code.
        To check, click your name in the bottom-left corner of Claude and choose{' '}
        <strong>{CLAUDE_PLAN_WORKSPACE}</strong>. In Claude Code, run <code>/login</code> and pick
        the Teams plan.
      </p>
      {!compact && (
        <p className="text-sm mt-3" style={{ color: 'var(--cw-ink-muted)' }}>
          Every Teams seat includes Claude chat, Cowork and Claude Code. Chat history, custom skills
          you built and Cowork scheduled tasks do not move over from {LEGACY_CLAUDE_PLAN} on their own, so copy
          what you need before you switch. Not on the plan yet, or hitting a usage limit? Contact{' '}
          {AI_HELP_CONTACT.name} ({AI_HELP_CONTACT.email}).
        </p>
      )}
    </Callout>
  );
}
