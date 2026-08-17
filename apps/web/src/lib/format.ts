export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return '0';
  }
  return new Intl.NumberFormat('id-ID').format(Math.round(value));
}

export function formatDecimal(value: number, maxDigits = 1): string {
  if (!Number.isFinite(value)) {
    return '0';
  }
  return value.toLocaleString('id-ID', { maximumFractionDigits: maxDigits });
}

export function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) {
    return 'baru saja';
  }
  if (minutes < 60) {
    return `${minutes} mnt lalu`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} jam lalu`;
  }
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

export function initials(name: string): string {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) {
    return '?';
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function formatScore(score: string): string {
  const value = Number(score);
  if (!Number.isFinite(value) || value <= 0) {
    return '—';
  }
  return `${(value / 1e12).toFixed(2)}T`;
}

export function weekdayLabel(dateKey: string): string {
  const d = new Date(`${dateKey}T00:00:00`);
  if (Number.isNaN(d.getTime())) {
    return dateKey;
  }
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

export function fullDateLabel(dateKey: string): string {
  const d = new Date(`${dateKey}T00:00:00`);
  if (Number.isNaN(d.getTime())) {
    return dateKey;
  }
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}
