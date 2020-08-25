import React from 'react';
import PropTypes from 'prop-types';

import BaseButton from './BaseButton';

const ActionsButton = React.memo(({ theme, onPress }) => (
	<BaseButton
		onPress={onPress}
		testID='messagebox-actions'
		accessibilityLabel='Message_actions'
		icon='add'
		theme={theme}
	/>
));

ActionsButton.propTypes = {
	theme: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
	,
	onPress: PropTypes.func.isRequired
};

export default ActionsButton;
