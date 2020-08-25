import React from 'react';
import PropTypes from 'prop-types';

import BaseButton from './BaseButton';

const CancelEditingButton = React.memo(({ theme, onPress }) => (
	<BaseButton
		onPress={onPress}
		testID='messagebox-cancel-editing'
		accessibilityLabel='Cancel_editing'
		icon='close'
		theme={theme}
	/>
));

CancelEditingButton.propTypes = {
	theme: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
	,
	onPress: PropTypes.func.isRequired
};

export default CancelEditingButton;
