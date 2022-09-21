import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";

const view = (state, { dispatch, updateState, updateProperties }) => {
	const { url, httpMethod, requestState } = state.properties;
	if (requestState != "idle") {
		console.log("URL: " + url);
		debugger;

		if (!url) {
			dispatch("UIC_CORS#COMPLETE", null);
		} else if (requestState != "fetching") {
			updateProperties({ requestState: "fetching" });
			fetch(url)
				.then((res) => {
					return res.json();
				})
				.then(
					(result) => {
						console.log(result);
						dispatch("UIC_CORS#COMPLETE", result);
					},
					(error) => {
						dispatch("UIC_CORS#ERROR", error);
					}
				);
		}
		updateProperties({ requestState: "idle" });
	}

	return (
		<div>
			<p>CORS Client Requester</p>
			<div>Url: [{url}]</div>
			<p>State: "{requestState}"</p>
		</div>
	);
};

createCustomElement("snc-uic-cors-test", {
	renderer: { type: snabbdom },
	view,
	styles,
	dispatches: {
		/**
		 * Dispatched when CORS request is started. Used to manage
		 * @type {{response:string}}
		 */
		"UIC_CORS#BEGIN": {},
		/**
		 * Dispatched when CORS request is completed
		 * @type {{response:string}}
		 */
		"UIC_CORS#COMPLETE": {},
		/**
		 * Dispatched when CORS request fails
		 * @type {{code:string, response:string}}
		 */
		"UIC_CORS#ERROR": {},
	},
	properties: {
		/**
		 * URL to make the request to
		 * @type {string}
		 */
		url: {
			required: true,
			schema: { type: "string" },
			default: "https://api.github.com",
		},
		/**
		 * Http Method for request, e.g. "GET", "POST", "PATCH"
		 * @type {string}
		 */
		httpMethod: { required: true, schema: { type: "string" }, default: "GET" },
		/**
		 * The current state of the CORS request. Used to force an update if the value is anything other than "idle".
		 * @type {string}
		 */
		requestState: {
			required: true,
			schema: { type: "string" },
			default: "",
		},
	},
});
