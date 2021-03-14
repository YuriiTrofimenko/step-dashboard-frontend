import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {inject, observer} from "mobx-react"
import HeaderCardModel from '../../../models/HeaderCardModel'
import {reaction} from 'mobx'
import {HeaderCardStore} from "../../../stores/HeaderCardStore"
import {CommonStore} from "../../../stores/CommonStore"
import {Button, Drawer, Table, TextField, withStyles, WithStyles} from "@material-ui/core"
import { Add as AddIcon, Edit as EditIcon, Send as SendIcon, Delete as DeleteIcon } from "@material-ui/icons"
import { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

interface IProps {}

interface IInjectedProps extends WithStyles<typeof styles>, IProps {
  commonStore: CommonStore,
  headerCardStore: HeaderCardStore
}

interface IState {
    formMode: string,
    sidePanelVisibility: boolean
}

const styles = (theme: Theme) => createStyles({
        title: {
            display: 'inline',
            marginRight: 15
        },
        categoriesTableColumnsHeader: {
            '& > th': {
                textAlign: 'left'
            }
        },
    })

@inject("commonStore", "headerCardStore")
@observer
class AudienceEditor extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            formMode: 'add',
            sidePanelVisibility: false
        }
    }

    get injected() {
      return this.props as IInjectedProps
    }

    componentDidMount() {
      this.injected.headerCardStore.fetchHeaderCardList()
    }

    toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        this.setState({sidePanelVisibility: open})
    }

    handleAudienceNameChange = (e: React.ChangeEvent<{ value: unknown }>) => {
      const audienceName = e.target.value
      console.log(audienceName)
      if (typeof audienceName === 'string') {
        this.injected.headerCardStore.setHeaderCardNumber(audienceName)
      }
    }

    handleAudienceAdd = (e: React.MouseEvent) => {
        this.setState({sidePanelVisibility: true})
    }

    handleAudienceEdit = (e: React.MouseEvent, headerCardId: number | null) => {
        this.injected.headerCardStore.setCurrentHeaderCardId(headerCardId)
        this.setState({sidePanelVisibility: true})
    }

    handleAudienceDelete = (e: React.MouseEvent, headerCardId: number | null) => {
        this.injected.headerCardStore.setCurrentHeaderCardId(headerCardId)
        this.injected.headerCardStore.deleteHeaderCard()
    }

    handleSubmitForm = (e: React.MouseEvent) => {
        e.preventDefault()
        this.setState({sidePanelVisibility: false})
        this.injected.headerCardStore.saveHeaderCard()
    }

    render () {
        const { loading } = this.injected.commonStore
        const { headerCardList, audienceNumber } = this.injected.headerCardStore
        const { classes } = this.injected
        return <div>
            <h2 className={classes.title}>Audiences</h2>
            <Button
                variant='outlined'
                disabled={loading}
                onClick={this.handleAudienceAdd}
            >
                <AddIcon/>
            </Button>
            <Drawer
                open={ this.state.sidePanelVisibility } onClose={this.toggleDrawer(false)}>
                <form>
                    <div>
                        <TextField
                            id="name"
                            label={'audience name'}
                            value={audienceNumber}
                            onChange={this.handleAudienceNameChange}
                        />
                    </div>
                    <div>
                        <Button
                            disabled={loading}
                            onClick={this.handleSubmitForm}
                        >
                            <SendIcon/>
                        </Button>
                    </div>
                </form>
            </Drawer>
            <Table>
                <thead>
                <tr className={classes.categoriesTableColumnsHeader}>
                    <th data-field="id">ID</th>
                    <th data-field="name">Name</th>
                </tr>
                </thead>
                <tbody>
                {headerCardList.map(headerCard => {
                    return (
                        <tr key={headerCard.id}>
                            <td>{headerCard.id}</td>
                            <td>{headerCard.audienceNumber}</td>
                            <td>
                                <div>
                                    <Button
                                        onClick={(e) => {
                                            this.handleAudienceEdit(e, headerCard.id ?? null)
                                        }}>
                                        <EditIcon/>
                                    </Button>
                                    <Button
                                        onClick={(e) => {
                                            this.handleAudienceDelete(e, headerCard.id ?? null)
                                        }}>
                                        <DeleteIcon/>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    }
}

export default withStyles(styles)(AudienceEditor)