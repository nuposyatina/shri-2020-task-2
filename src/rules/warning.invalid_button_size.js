const { findBlocks, getEthalonSize } = require('../lib');
const sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxl'];

module.exports = (data, ast, errors, state) => {
	const isWarning = data.block === 'warning' && !data.elem;
	if (!isWarning) return errors;
	const buttons = findBlocks(data, ast, ['button']);
	if (!buttons.length) return errors;
	if (!state.warningEthalonSizeIsChecked) {
		state.warningEthalonSize = getEthalonSize(findBlocks(data, ast, ['text']));
		state.warningEthalonSizeIsChecked = true;
	}
	if (!state.warningEthalonSize && state.warningEthalonSizeIsChecked) return errors;
	const errorInfo = {
		code: 'WARNING.INVALID_BUTTON_SIZE', 
		error: 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного'
	}
	const ethalonSizeIndex = sizes.findIndex(size => size === state.warningEthalonSize);
	if (!ethalonSizeIndex) return errors;
	return buttons.reduce((acc, button) => {
		const buttonSize = button.mods && button.mods.size;
		const buttonEthalonSize = sizes[ethalonSizeIndex + 1];
		if (!buttonSize || buttonSize !== buttonEthalonSize) {
			const err = {
				...errorInfo,
				location: {
					...button.location
				}
			};
			return [...acc, err];
		}
		return acc;
	}, errors);
}