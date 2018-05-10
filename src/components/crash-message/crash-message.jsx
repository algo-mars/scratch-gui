/* eslint-disable react/jsx-no-literals */
/*
    @todo Rule is disabled because this component is rendered outside the
    intl provider right now so cannot be translated.
*/

import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';

import styles from './crash-message.css';
import reloadIcon from './reload.svg';

const CrashMessage = props => (
    <div className={styles.crashWrapper}>
        <Box className={styles.body}>
            <img
                className={styles.reloadIcon}
                src={reloadIcon}
            />
            <h2>
                Ошибка! Проект не загружен.
            </h2>
            <p>
                Возможно, этот проект ещё не сконвертирован в Scratch-3 или файл проекта отсутствует на сервере.
            </p>
            <button
                className={styles.reloadButton}
                onClick={props.onReload}
            >
                Попробовать ещё
            </button>
        </Box>
    </div>
);

CrashMessage.propTypes = {
    onReload: PropTypes.func.isRequired
};

export default CrashMessage;
