export const MarkdownCSS = `
div[data-widget=pipeline-dsl] {
	--font-normal: 400;
	--font-demi-bold: 500;
	--font-bold: 600;
	--font-boldest: 700;

	--primary-color: rgb(94, 119, 171);
	--danger-color: rgb(222,89,99);
	--success-color: rgb(33, 157, 79);
	--warn-color: rgb(255, 161, 0);
	--info-color: rgb(138, 53, 193);
	--waive-color: rgb(191, 191, 191);
	--hover-color: rgb(195, 218, 241);
    --bg-color: #F9FAFC;
    --invert-color: #fff;
    --line-number-color: rgb(102,102,102,0.7);
    
    --margin: 32px;
    
    --border-width: 1px;
    --border-style: solid;
    --border-color: rgb(210, 220, 230);
    --border: var(--border-width) var(--border-style) var(--border-color);
    --border-radius: 4px;
    
    --param-height: 22px;
    
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    background-color: var(--bg-color);
    border-radius: var(--param-height);
    margin-bottom: var(--margin);
    overflow: hidden;
}
code[data-widget=dsl] {
	display: block;
	position: relative;
	line-height: 2em;
	counter-reset: section;
	padding-top: calc(var(--margin) / 2);
	padding-left: calc(var(--margin) * 3);
	padding-bottom: var(--margin)
	border: var(--border);
	border-radius: var(--param-height);
	font-family: 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New', monospace;
}
code[data-widget=dsl]:before {
	content: '';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: calc(var(--margin) * 2.5);
	height: 100%;
	background-color: var(--border-color);
	border-radius: calc(var(--param-height) - 1px) 0 0 calc(var(--param-height) - 1px);
	opacity: 0.2;
	z-index: -1;
}
span[data-widget=dsl-empty-line] {
	display: block;
	position: relative;
	float: left;
	clear: both;
	font-weight: 600;
	height: 2em;
}
span[data-widget=dsl-empty-line]:before {
	content: counter(section);
	counter-increment: section;
	display: block;
	position: absolute;
	top: 0;
	right: calc(100% - var(--margin) * -1);
	color: var(--line-number-color);
	opacity: 0.7;
}
span[data-widget=dsl-whitespace] {
	display: block;
	float: left;
	font-weight: 600;
	opacity: 0;
	height: 2em;
	width: 8px;
}
span[data-widget=dsl-line-comment] {
	display: block;
	position: relative;
	float: left;
	clear: both;
	font-weight: 600;
	font-variant: petite-caps;
}
span[data-widget=dsl-line-comment]:before {
	content: '#';
	margin-right: 2px;
}
span[data-widget=dsl-line-comment]:after {
	content: counter(section);
	counter-increment: section;
	display: block;
	position: absolute;
	top: 0;
	right: calc(100% - var(--margin) * -1);
	color: var(--line-number-color);
	opacity: 0.7;
}
span[data-widget=dsl-prop-name],
span[data-widget=dsl-prop-name-in-1st-line] {
	display: block;
	position: relative;
	float: left;
	clear: both;
	color: var(--info-color);
	font-weight: var(--font-bold);
	margin-right: calc(var(--margin) / 4);
}
span[data-widget=dsl-prop-name]:before,
span[data-widget=dsl-prop-name-in-1st-line]:before {
	content: counter(section);
	counter-increment: section;
	display: block;
	position: absolute;
	top: 0;
	right: calc(100% - var(--margin) * -1);
	color: var(--line-number-color);
	opacity: 0.7;
}
span[data-widget=dsl-prop-name]:after,
span[data-widget=dsl-prop-name-in-1st-line]:after {
	content: ':';
}
span[data-widget=dsl-prop-value],
span[data-widget=dsl-topic-name],
span[data-widget=dsl-factor-name],
span[data-widget=dsl-variable-name],
span[data-widget=dsl-boolean-value],
span[data-widget=dsl-enum-value],
span[data-widget=dsl-trigger-on],
span[data-widget=dsl-action-type],
span[data-widget=dsl-parameter-from],
span[data-widget=dsl-compute-type],
span[data-widget=dsl-expression-operator],
span[data-widget=dsl-conjunction-word],
span[data-widget=dsl-aggregate-arithmetic],
span[data-widget=dsl-bracket] {
	display: block;
	float: left;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
span[data-widget=dsl-prop-value]:empty,
span[data-widget=dsl-topic-name]:empty,
span[data-widget=dsl-factor-name]:empty,
span[data-widget=dsl-variable-name]:empty,
span[data-widget=dsl-boolean-value]:empty,
span[data-widget=dsl-enum-value]:empty,
span[data-widget=dsl-trigger-on]:empty,
span[data-widget=dsl-action-type]:empty,
span[data-widget=dsl-parameter-from]:empty,
span[data-widget=dsl-compute-type]:empty,
span[data-widget=dsl-expression-operator]:empty,
span[data-widget=dsl-conjunction-word]:empty,
span[data-widget=dsl-aggregate-arithmetic]:empty,
span[data-widget=dsl-bracket]:empty {
	text-decoration: none;
}
span[data-widget=dsl-prop-value]:empty:after,
span[data-widget=dsl-topic-name]:empty:after,
span[data-widget=dsl-factor-name]:empty:after,
span[data-widget=dsl-variable-name]:empty:after,
span[data-widget=dsl-boolean-value]:empty:after,
span[data-widget=dsl-enum-value]:empty:after,
span[data-widget=dsl-trigger-on]:empty:after,
span[data-widget=dsl-action-type]:empty:after,
span[data-widget=dsl-parameter-from]:empty:after,
span[data-widget=dsl-compute-type]:empty:after,
span[data-widget=dsl-expression-operator]:empty:after,
span[data-widget=dsl-conjunction-word]:empty:after,
span[data-widget=dsl-aggregate-arithmetic]:empty:after,
span[data-widget=dsl-bracket]:empty:after {
	content: '?';
	font-weight: var(--font-boldest);
	color: var(--invert-color);
	background-color: red;
	padding: 0 4px;
	border-radius: var(--border-radius);
}
span[data-widget=dsl-prop-value][data-incorrect=true],
span[data-widget=dsl-topic-name][data-incorrect=true],
span[data-widget=dsl-factor-name][data-incorrect=true],
span[data-widget=dsl-variable-name][data-incorrect=true],
span[data-widget=dsl-boolean-value][data-incorrect=true],
span[data-widget=dsl-enum-value][data-incorrect=true],
span[data-widget=dsl-trigger-on][data-incorrect=true],
span[data-widget=dsl-action-type][data-incorrect=true],
span[data-widget=dsl-parameter-from][data-incorrect=true],
span[data-widget=dsl-compute-type][data-incorrect=true],
span[data-widget=dsl-expression-operator][data-incorrect=true],
span[data-widget=dsl-conjunction-word][data-incorrect=true],
span[data-widget=dsl-aggregate-arithmetic][data-incorrect=true],
span[data-widget=dsl-bracket][data-incorrect=true] {
	font-weight: var(--font-boldest);
	color: red;
}
span[data-widget=dsl-topic-name] {
	color: var(--warn-color);
	font-weight: var(--font-boldest);
	text-decoration: underline;
}
span[data-widget=dsl-topic-name]:empty:after {
	content: 'topic?';
}
span[data-widget=dsl-factor-name] {
	color: var(--warn-color);
	font-weight: var(--font-boldest);
	text-decoration: underline;
}
span[data-widget=dsl-factor-name]:empty:after {
	content: 'factor?';
}
span[data-widget=dsl-variable-name] {
	color: var(--success-color);
	font-weight: var(--font-boldest);
	text-decoration: underline;
}
span[data-widget=dsl-variable-name]:empty:after {
	content: 'variable?';
}
span[data-widget=dsl-boolean-value] {
	color: var(--danger-color);
}
span[data-widget=dsl-enum-value],
span[data-widget=dsl-trigger-on],
span[data-widget=dsl-action-type],
span[data-widget=dsl-parameter-from],
span[data-widget=dsl-compute-type],
span[data-widget=dsl-expression-operator],
span[data-widget=dsl-conjunction-word],
span[data-widget=dsl-aggregate-arithmetic],
span[data-widget=dsl-bracket] {
	text-transform: uppercase;
	font-variant: petite-caps;
	color: var(--primary-color);
}
span[data-widget=dsl-expression-operator] {
	text-transform: uppercase;
}
span[data-widget=dsl-conjunction-word] {
	color: var(--info-color);
	font-weight: var(--font-boldest);
}
span[data-widget=dsl-aggregate-arithmetic] {
	font-weight: var(--font-boldest);
}
span[data-widget=dsl-bracket] {
	color: var(--danger-color);
	font-weight: var(--font-boldest);
}
div[data-widget=dsl-joint] {
}
`;
