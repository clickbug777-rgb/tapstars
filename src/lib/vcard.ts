import { Business } from '../types';

/**
 * Generates standard vCard 3.0 content for iOS and Android contacts
 */
export function generateVCard(business: Business): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${business.name}`,
    `ORG:${business.name}`,
  ];

  if (business.category) {
    lines.push(`TITLE:${business.category}`);
  }

  if (business.phone) {
    lines.push(`TEL;TYPE=WORK,VOICE:${business.phone}`);
  }

  if (business.whatsapp && business.whatsapp !== business.phone) {
    lines.push(`TEL;TYPE=CELL,MSG:${business.whatsapp}`);
  }

  if (business.email) {
    lines.push(`EMAIL;TYPE=INTERNET,PREF:${business.email}`);
  }

  if (business.website) {
    lines.push(`URL:${business.website}`);
  }

  if (business.address) {
    lines.push(`ADR;TYPE=WORK:;;${business.address.replace(/[\n,]+/g, ';')};;;;`);
  }

  if (business.description) {
    lines.push(`NOTE:${business.description.replace(/[\n\r]+/g, ' ')}`);
  }

  lines.push('END:VCARD');
  return lines.join('\r\n');
}

/**
 * Initiates direct download of .vcf contact file in browser
 */
export function downloadVCard(business: Business): void {
  const vcardText = generateVCard(business);
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${business.slug || 'business'}-contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
