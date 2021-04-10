import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ConfigConstants } from 'common/constants/configConstants';
import { BlogsSubscriber } from 'subscribers/blogs.subscriber';
dotenv.config();

const _prefix = 'CODING_TEST';
const _env = process.env;

const configLoader = (key: string) => {
  return _env[`${_prefix}_${[key]}`];
};

const TYPE_ORM = {
  postgreSQL: {
    type: 'postgres',
    host: configLoader(ConfigConstants.POSTGRESQL_HOST),
    port: Number(configLoader(ConfigConstants.POSTGRESQL_PORT)),
    username: configLoader(ConfigConstants.POSTGRESQL_USERNAME),
    password: configLoader(ConfigConstants.POSTGRESQL_PASSWORD),
    database: configLoader(ConfigConstants.POSTGRESQL_DATABASE),
    subscribers: [BlogsSubscriber],
    logging: true,
  } as TypeOrmModuleOptions,
};

const json = configLoader(ConfigConstants.FIREBASE_SERVICE_JSON_ONE_LINE);
const googleServiceAccount = JSON.parse(json);

const FIREBASE_SERVICE_CREDENTIALS = {
  type: googleServiceAccount.type,
  projectId: googleServiceAccount.project_id,
  privateKeyId: googleServiceAccount.private_key_id,
  privateKey: googleServiceAccount.private_key,
  clientEmail: googleServiceAccount.client_email,
  clientId: googleServiceAccount.client_id,
  authUri: googleServiceAccount.auth_uri,
  tokenUri: googleServiceAccount.token_uri,
  authProviderX509CertUrl: googleServiceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: googleServiceAccount.client_x509_cert_url,
};

export { FIREBASE_SERVICE_CREDENTIALS, TYPE_ORM, configLoader };
