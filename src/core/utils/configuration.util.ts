import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const ENV = process.env.NODE_ENV;
const YML_CONFIG_FILENAME = 'config.yml';

const configuration = (currentPath?: string) => () => {
  const resultPath = currentPath || (__dirname.toLowerCase().split('node_modules')[0]);

  return yaml.load(
    readFileSync(resultPath + `config/${ENV ? `${ENV}.` : ''}${YML_CONFIG_FILENAME}`, 'utf8'),
  ) as Record<string, any>;
};

export default configuration;
