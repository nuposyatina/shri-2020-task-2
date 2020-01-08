const sizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxl'];

module.exports = (data, ast, errors, state) => {
	const isWarning = data.block === 'warning' && !data.elem;
	if (!isWarning) return errors;
	const buttons = findBlocks(data, ast, ['button']);
	if (!buttons.length) return errors;
	if (!state.warningEthalonSizeIsChecked) {
		state.warningEthalonSize = getEthalonSize(data);
		state.warningEthalonSizeIsChecked = true;
	}
	if (!state.warningEthalonSize && state.warningEthalonSizeIsChecked) return errors;
	const errorInfo = {
		code: 'WARNING.INVALID_BUTTON_SIZE', 
		error: 'Размер кнопки блока warning должен быть на один шаг больше эталонного'
	}
	for (let button of buttons) {
		const hasSize = button.mods && button.mods.size;
		const ethalonSizeIndex = sizes.findIndex(state.warningEthalonSize);
		const buttonEthalonSize = sizes[ethalonSizeIndex + 1];
		
		if (!hasSize || button.mods.size !== buttonEthalonSize) {
			const err = {
				...errorInfo,
				location: {
					...button.location
				}
			};
			return [...errors, err];
		}
	}
	return errors;
}