import { CalendarPlus, ExternalLink, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LearningSession } from "@/lib/learning/workspace";

function isEnded(session: LearningSession) {
  return new Date(session.endsAt).getTime() < Date.now();
}

export function sessionDate(session: LearningSession) {
  return new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date(session.startsAt));
}

export function LiveClassActions({
  session,
  entitled,
}: {
  session: LearningSession | null;
  entitled: boolean;
}) {
  if (!session)
    return (
      <p className="text-muted-foreground text-sm leading-6">
        Class schedule publish হলে এখানেই Google Meet ও Calendar action দেখা
        যাবে।
      </p>
    );
  const ended = isEnded(session);
  return (
    <div className="space-y-3">
      <p className="text-muted-foreground text-sm">{sessionDate(session)}</p>
      <div className="grid gap-3">
        <Button
          size="lg"
          className="border-brand-navy/75 text-brand-navy h-14 rounded-2xl border-b-4 bg-white text-base font-bold shadow-[0_8px_16px_-12px_rgb(17_24_68_/_55%)] hover:bg-white"
          disabled={!entitled || ended || !session.meetUrl}
          asChild={Boolean(entitled && !ended && session.meetUrl)}
        >
          {entitled && !ended && session.meetUrl ? (
            <a href={session.meetUrl} target="_blank" rel="noreferrer">
              <Video className="text-brand-gold" />
              Google Meet-এ Join করুন
              <ExternalLink />
            </a>
          ) : (
            <span>
              <Video className="text-brand-gold" />
              {ended ? "Ended" : "Google Meet link আসছে"}
            </span>
          )}
        </Button>
        {entitled && session.calendarUrl ? (
          <Button
            size="lg"
            variant="outline"
            className="border-brand-navy/45 h-13 rounded-2xl border-b-4 bg-white text-base font-bold shadow-[0_8px_16px_-12px_rgb(17_24_68_/_35%)]"
            asChild
          >
            <a href={session.calendarUrl} target="_blank" rel="noreferrer">
              <CalendarPlus className="text-brand-indigo" />
              Add to Calendar
              <ExternalLink />
            </a>
          </Button>
        ) : (
          <Button
            size="lg"
            variant="outline"
            className="h-13 rounded-2xl"
            disabled
          >
            <CalendarPlus />
            Add to Calendar
          </Button>
        )}
      </div>
    </div>
  );
}
