import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
  mapToTarget(event: any) {
    const ses = event.Records[0].ses;

    const spam = ses.receipt.spamVerdict.status === 'PASS';
    const virus = ses.receipt.virusVerdict.status === 'PASS';
    const dns =
      ses.receipt.spfVerdict.status === 'PASS' &&
      ses.receipt.dkimVerdict.status === 'PASS' &&
      ses.receipt.dmarcVerdict.status === 'PASS';

    const mes = new Date(ses.mail.timestamp).toLocaleString('default', {
      month: 'long',
    });

    const retrasado = ses.receipt.processingTimeMillis > 1000;

    const emisor = ses.mail.source.split('@')[0];
    const receptor = ses.mail.destination.map(
      (email: string) => email.split('@')[0],
    );

    return {
      spam,
      virus,
      dns,
      mes,
      retrasado,
      emisor,
      receptor,
    };
  }
}
