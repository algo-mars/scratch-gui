import React from 'react';
import PropTypes from 'prop-types';
import styles from './project-title.css';

class ProjectTitle extends React.Component {
    constructor (props) {
        super(props);
        this.state = {temporaryValue: props.value};
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleBlur () {
        this.props.onChange(this.state.temporaryValue);
    }

    handleChange ({target}) {
        this.setState({temporaryValue: target.value});
    }

    handleKeyPress ({target, key}) {
        if (key === 'Enter') {
            target.blur();
        }
    }

    render () {
        return (
            <input
                className={styles.titleField}
                disabled={!this.props.onChange}
                type="text"
                value={this.state.temporaryValue}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
            />
        );
    }
}

ProjectTitle.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

ProjectTitle.displayName = 'ProjectTitle';

export default ProjectTitle;
