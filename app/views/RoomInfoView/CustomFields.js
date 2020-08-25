import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

const CustomFields = ({ customFields, theme }) => {
	if (customFields) {
		return (
			Object.keys(customFields).map((title) => {
				if (!customFields[title]) {
					return;
				}
				return (
					<Item
						label={title}
						content={customFields[title]}
						theme={theme}
					/>
				);
			})
		);
	}

	return null;
};
CustomFields.propTypes = {
	customFields: PropTypes.object,
	theme: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])

};

export default CustomFields;
