import { CalendarPlus, ExternalLink, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sessionDate } from "@/components/dashboard/live-class-actions";
import type { LearningModule, LearningSession } from "@/lib/learning/workspace";

function isEnded(session: LearningSession) {
  return new Date(session.endsAt).getTime() < Date.now();
}

function countdown(startsAt: string) {
  const remaining = Math.max(0, new Date(startsAt).getTime() - Date.now());
  const minutes = Math.floor(remaining / 60_000);
  return [
    [Math.floor(minutes / 1_440), "দিন"],
    [Math.floor((minutes % 1_440) / 60), "ঘণ্টা"],
    [minutes % 60, "মিনিট"],
  ] as const;
}

export function NextLiveClassPanel({
  session,
  module,
  entitled,
}: {
  session: LearningSession | null;
  module: LearningModule | null;
  entitled: boolean;
}) {
  const ended = session ? isEnded(session) : false;
  return (
    <section className="overflow-hidden rounded-[2rem] border border-brand-navy/15 bg-white shadow-[0_18px_38px_-28px_rgb(17_24_68_/_60%)]">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        <div className="p-6 sm:p-8">
          <p className="text-brand-indigo text-sm font-bold tracking-[0.16em] uppercase">
            Next live class
          </p>
          {session && module ? (
            <>
              <h2 className="font-heading mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
                Module {module.position.toLocaleString("bn-BD", { minimumIntegerDigits: 2 })}: {module.title}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm sm:text-base">
                {sessionDate(session)}
              </p>
              {!ended ? (
                <div className="mt-5 flex flex-wrap gap-2" aria-label="Class starts in">
                  {countdown(session.startsAt).map(([value, label]) => (
                    <span key={label} className="bg-brand-cream text-brand-navy rounded-full px-4 py-2 text-sm font-bold">
                      {value.toLocaleString("bn-BD")} {label}
                    </span>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <>
              <h2 className="font-heading mt-2 text-2xl font-extrabold">পরবর্তী class এখনও publish হয়নি</h2>
              <p className="text-muted-foreground mt-3 text-sm leading-6">Schedule publish হলে Meet ও Calendar action এখানেই দেখা যাবে।</p>
            </>
          )}
        </div>
        <div className="bg-brand-cream/75 dotted-grid border-brand-navy/10 flex min-h-56 items-center border-t p-5 lg:border-t-0 lg:border-l lg:p-8">
          {session ? (
            <div className="w-full space-y-3">
              <Button
                size="lg"
                className="border-brand-navy/80 text-brand-navy h-16 w-full rounded-[1.6rem] border-b-5 bg-white text-base font-extrabold shadow-[0_8px_0_rgb(17_24_68_/_78%)] hover:bg-white"
                disabled={!entitled || ended || !session.meetUrl}
                asChild={Boolean(entitled && !ended && session.meetUrl)}
              >
                {entitled && !ended && session.meetUrl ? (
                  <a href={session.meetUrl} target="_blank" rel="noreferrer"><Video className="text-brand-gold" />Google Meet-এ Join করুন<ExternalLink /></a>
                ) : (
                  <span><Video className="text-brand-gold" />{ended ? "Ended" : entitled ? "Google Meet link আসছে" : "Enrollment প্রয়োজন"}</span>
                )}
              </Button>
              <Button size="lg" variant="outline" className="border-brand-navy/45 h-14 w-full rounded-[1.4rem] border-b-4 bg-white text-base font-extrabold shadow-[0_5px_0_rgb(17_24_68_/_42%)]" disabled={!entitled || !session.calendarUrl} asChild={Boolean(entitled && session.calendarUrl)}>
                {entitled && session.calendarUrl ? (
                  <a href={session.calendarUrl} target="_blank" rel="noreferrer"><CalendarPlus className="text-brand-indigo" />Add to Calendar<ExternalLink /></a>
                ) : <span><CalendarPlus />Add to Calendar</span>}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
