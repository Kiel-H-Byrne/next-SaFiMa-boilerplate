import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

class CheckoutStepper extends Component {
  render() {
    const { classes, activeStep, steps, handleThisStep } = this.props;

    const connector = (
      <StepConnector
        style={{ padding: '0 1em' }}
        classes={{
          active: classes.connectorActive,
          completed: classes.connectorCompleted,
          disabled: classes.connectorDisabled,
          line: classes.connectorLine,
          root: classes.lineHorizontal
        }}
      />
    );

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={connector}
            style={{ padding: '2.5em 0 2em 0' }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  onClick={
                    activeStep > index ? () => handleThisStep(index) : () => {}
                  }
                  classes={{
                    iconContainer: classes.iconContainer
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12}>
          {this.props.children}
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  root: {},
  helpPanel: {
    padding: '1em'
  },
  instructions: {
    marginBottom: theme.spacing()
  },
  iconContainer: {
    transform: 'scale(1.6)',
    zIndex: 1,
    fontWeight: 'bolder'
  },
  stepperIcons: {
    fill: theme.palette.primary.main,
    width: '3em',
    height: '3em',
    margin: 0
  },
  text: {
    fontFamily: theme.typography.fontFamily,
    fill: theme.palette.text.primary
  },
  connectorActive: {
    '& $connectorLine': {
      backgroundColor: `${theme.palette.primary.main}`,
      height: 5,
      border: 0,
      padding: '0 1em'
    }
  },
  connectorCompleted: {
    '& $connectorLine': {
      backgroundColor: `${theme.palette.primary.main}`,
      height: 5,
      border: 0,
      padding: '0 1em'
    }
  },
  connectorDisabled: {
    '& $connectorLine': {
      backgroundColor: theme.palette.background.paper,
      height: 5,
      border: 0
    }
  },
  connectorLine: {
    height: '1em',
    transition: theme.transitions.create('background-color'),
    padding: '0 1em'
  }
});

CheckoutStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
  handleThisStep: PropTypes.func.isRequired
};

export default withWidth()(withStyles(styles)(CheckoutStepper));
