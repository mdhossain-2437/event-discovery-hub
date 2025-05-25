import { useEffect } from "react";

/**
 * Custom hook for setting the document title
 * @param title Page title
 */
const useTitle = (title) => {
	useEffect(() => {
		if (title) {
			document.title = `${title} - Event Explorer`;
		}
	}, [title]);
};

export default useTitle;
