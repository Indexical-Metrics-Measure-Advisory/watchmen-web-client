export interface EchartsScriptHolder {
	script?: string;
	scriptVarsDefs?: string;
	scriptVars?: { [key in string]: any };
}