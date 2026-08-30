import { Heart } from "lucide-react";
import { useMiora } from "../../context/MioraContext";
import { formatAbsoluteDateTime } from "../../lib/dateUtils";
import type { RemembranceContext } from "../../types";

interface RecentRemembrancesProps {
  personId: string;
}

const CONTEXT_LABELS: Record<string, string> = {
  memory: "Memory",
  conversation: "Conversation",
  feeling: "Feeling",
  place: "Place",
};

function formatContextItem(ctx: RemembranceContext): string {
  return `${CONTEXT_LABELS[ctx.type]}: ${ctx.content}`;
}

export default function RecentRemembrances({ personId }: RecentRemembrancesProps) {
  const { getRemembrances, getContextsForRemembrance } = useMiora();
  const remembrances = getRemembrances(personId);

  if (remembrances.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-miora-muted">No memories yet.</p>
      </div>
    );
  }

  return (
    <div>
      {remembrances.map((remembrance, index) => {
        const contextItems = getContextsForRemembrance(remembrance.id);
        const dateTime = formatAbsoluteDateTime(remembrance.rememberedAt);
        const dateLabel = dateTime?.split(",")[0] ?? "Unknown";
        const timeLabel = dateTime?.split(", ").slice(1).join(", ") ?? "";

        return (
          <div key={remembrance.id} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-miora-accent mt-[7px] shrink-0" />
              {index < remembrances.length - 1 && (
                <div className="w-px flex-1 bg-miora-line/60 my-1" />
              )}
            </div>

            <div className="pb-7 flex-1 min-w-0">
              <div className="flex items-baseline gap-2.5 mb-1.5">
                <span className="text-[14px] font-medium text-miora-charcoal">
                  {dateLabel}
                </span>
                {timeLabel && (
                  <span className="text-[12px] text-miora-muted/60">
                    {timeLabel}
                  </span>
                )}
              </div>
              {contextItems.length > 0 && (
                <div className="space-y-0.5">
                  {contextItems.map((ctx) => (
                    <div key={ctx.id} className="flex items-center gap-2">
                      <Heart
                        size={11}
                        className="text-miora-accent/40 shrink-0"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                      <span className="text-[13px] text-miora-muted/70 leading-relaxed">
                        {formatContextItem(ctx)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
