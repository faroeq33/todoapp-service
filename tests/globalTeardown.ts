import config from './utils/config';
import * as DBManager from './utils/DBManager';

export = async function globalTeardown() {
	if (!config.Memory) return; // Guard clause to exit early if Memory is not enabled

	DBManager.disconnect();
};