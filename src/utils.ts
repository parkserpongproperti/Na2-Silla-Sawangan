export function formatRupiah(value: number): string {
  if (value >= 1000000000) {
    const miliar = value / 1000000000;
    return `Rp ${miliar.toLocaleString('id-ID', { maximumFractionDigits: 2 })} Miliar`;
  }
  if (value >= 1000000) {
    const juta = value / 1000000;
    return `Rp ${juta.toLocaleString('id-ID', { maximumFractionDigits: 0 })} Juta`;
  }
  return `Rp ${value.toLocaleString('id-ID')}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString('id-ID');
}
