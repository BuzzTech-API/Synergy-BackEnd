import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const jwtConstants = {
    secret: 'FI0RuHP7qnePXokyRosICvZXTRQ38g+30iBev6G7hA+zM8Ro4K+bihTLR+AblNgjWf4xfg1FSmR+2mgnsOHVzfYU/u5vN8e2qCN4ROctR20tzgpm6f1pvfu7wCDNR6u/IuR0+Upc9P07oE/Je37zSYV2n5HXmSHbftlQu9At9lyP2I0Sut/5bByhecwdXAnVaJ8EeCaJKrc7/7h+r1SEcWKcGc64l9lnIgvh2hfQVu/r7Vu9Nbp2LZjipJ6IopyH9x9+Rrf/lIarMZpLWjfkua7N3TZavhQ+7gBOppP/sHxEl5RVdB80E8mSD30qm/RR0vtWbbv3CnoXeCagxzELvA==',
  }