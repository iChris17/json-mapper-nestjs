import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Verdict {
  @IsNotEmpty()
  status: string;
}

class Receipt {
  @IsNotEmpty()
  timestamp: string;

  @IsNotEmpty()
  processingTimeMillis: number;

  @IsArray()
  @IsNotEmpty()
  recipients: string[];

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Verdict)
  spamVerdict: Verdict;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Verdict)
  virusVerdict: Verdict;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Verdict)
  spfVerdict: Verdict;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Verdict)
  dkimVerdict: Verdict;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Verdict)
  dmarcVerdict: Verdict;
}

class Mail {
  @IsNotEmpty()
  timestamp: string;

  @IsNotEmpty()
  source: string;

  @IsArray()
  destination: string[];
}

class Ses {
  @ValidateNested()
  @Type(() => Receipt)
  receipt: Receipt;

  @ValidateNested()
  @Type(() => Mail)
  mail: Mail;
}

class Record {
  @ValidateNested()
  @Type(() => Ses)
  ses: Ses;
}

export class SesEventDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Record)
  Records: Record[];
}
