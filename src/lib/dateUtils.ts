export function formatRelativeDate(isoDate: string | null): string | null {
  if (!isoDate) return null;

  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "Just now";
  if (diffMs < hour) {
    const mins = Math.floor(diffMs / minute);
    return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  }
  if (diffMs < day) {
    const hrs = Math.floor(diffMs / hour);
    return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  }
  if (diffMs < 2 * day) return "Yesterday";
  if (diffMs < 30 * day) {
    const days = Math.floor(diffMs / day);
    return `${days} days ago`;
  }
  if (diffMs < 365 * day) {
    const months = Math.floor(diffMs / (30 * day));
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }
  const years = Math.floor(diffMs / (365 * day));
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export function formatAbsoluteDateTime(isoDate: string | null): string | null {
  if (!isoDate) return null;

  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const day = 24 * 60 * 60 * 1000;

  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (diffMs < day && date.getDate() === now.getDate()) {
    return `Today, ${timeStr}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth()) {
    return `Yesterday, ${timeStr}`;
  }

  const dateStr = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  return `${dateStr}, ${timeStr}`;
}

export function sortPeopleByRecency<
  T extends { lastRememberedAt: string | null },
>(people: T[]): T[] {
  return [...people].sort((a, b) => {
    if (a.lastRememberedAt === null && b.lastRememberedAt === null) return 0;
    if (a.lastRememberedAt === null) return 1;
    if (b.lastRememberedAt === null) return -1;
    return new Date(b.lastRememberedAt).getTime() - new Date(a.lastRememberedAt).getTime();
  });
}

export function getDateLabel(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

export function getTimeLabel(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export interface DateGroup {
  label: string;
  dateKey: string;
  items: { id: string; createdAt: string }[];
}

export function groupByDate<T extends { id: string; createdAt: string }>(
  items: T[],
): DateGroup[] {
  const map = new Map<string, T[]>();

  for (const item of items) {
    const dateKey = new Date(item.createdAt).toDateString();
    const existing = map.get(dateKey) ?? [];
    existing.push(item);
    map.set(dateKey, existing);
  }

  const groups: DateGroup[] = [];
  for (const [dateKey, groupItems] of map) {
    groups.push({
      label: getDateLabel(groupItems[0].createdAt),
      dateKey,
      items: groupItems.map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
      })),
    });
  }

  return groups;
}
