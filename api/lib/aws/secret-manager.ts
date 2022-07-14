import { SecretsManager } from '@aws-sdk/client-secrets-manager';

export namespace AwsSecretManager {
  export const client = new SecretsManager({
    region: 'us-east-1'
  });

  export const attachToProcessEnv = async (secretId: string) => {
    let data = {};

    try {
      const result = await client.getSecretValue({
        SecretId: secretId
      });

      data = JSON.parse(result.SecretString || '{}');


    } catch (error) {
      console.warn('attachToProcessEnv:: Use default process.env');
      
      data = {
        DB_USER: 'mernadmin',
        DB_PASSWORD: 'oi3OUFM17N68'
      }
    }

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        process.env[key] = data[key];
      }
    }
  };
}
