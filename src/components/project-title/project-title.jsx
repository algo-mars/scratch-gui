import React from 'react';
import PropTypes from 'prop-types';
import styles from './project-title.css';

const MAX_TITLE_LENGTH = 50;

/*
 * Input with project title with related logic and validation.
 * Consider using a good 3rd party component here.
 */
class ProjectTitle extends React.Component {
    constructor (props) {
        super(props);
        this.state = {temporaryValue: props.value};
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleBlur () {
        const {value} = this.props;
        const {temporaryValue} = this.state;

        if (value === temporaryValue) return;

        if (!temporaryValue) {
            this.setState({temporaryValue: value});
        }

        this.props.onChange(temporaryValue);
    }

    handleChange ({target}) {
        this.setState({
            temporaryValue: target.value.slice(0, MAX_TITLE_LENGTH)
        });
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
