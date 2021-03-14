import React, { Component } from 'react'
import {inject, observer} from "mobx-react"
import {/* Button, Card, CardContent, Grid, Icon, TextField, */ WithStyles, withStyles} from "@material-ui/core"
import { createStyles, Theme } from '@material-ui/core/styles'
import {CommonStore} from '../../../stores/CommonStore'
import {UserStore} from '../../../stores/UserStore'

interface IProps {}

interface IInjectedProps extends WithStyles<typeof styles>, IProps {
    commonStore: CommonStore,
    userStore: UserStore
}

interface IState {
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 390,
    height: 150,
    backgroundColor: '#0a95dd',
    opacity: '25%'
    /* '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    }, */
  }
})

@inject("commonStore", "userStore")
@observer
class DigitalWatch extends Component<IProps, IState> {

  get injected() {
    return this.props as IInjectedProps
  }

  componentWillUnmount() {
      
  }

  /* handleUserNameChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const userName = e.target.value
    if (typeof userName === 'string') {
      this.injected.userStore.setUserName(userName)
    }
  }

  handlePasswordChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const password = e.target.value
    if (typeof password === 'string') {
      this.injected.userStore.setPassword(password)
    }
  }

  handleSubmitForm = (e: React.MouseEvent) => {
    e.preventDefault()
    this.injected.userStore.login()
  } */

  render () {
    // const { loading } = this.injected.commonStore
    const { classes } = this.injected
    return (
        <div className={classes.root}>
          12:00:00
        </div>
    )
  }
}

export default withStyles(styles)(DigitalWatch)