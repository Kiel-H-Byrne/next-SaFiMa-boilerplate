import React, { Component } from 'react'
// import { compose } from 'redux';
import { connect } from "react-redux";

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import NetworkGraph from './../Graph/NetworkGraph';
import BuildGraph from './../Graph/BuildGraph';
import StatsTable from '../Map/StatsTable';
import AssetSearch from '../Assets/AssetSearch';
import UptimeGraph from '../Graph/UptimeGraph';
import ProcessGraph from '../Graph/ProcessGraph';


class AppDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
	}

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { data, GMap} = this.props;
        return (
            <Drawer className="App-drawer"
                variant="permanent"
            >
                <Typography variant="h5" align="center" className="App-fancytext">Total: {Object.values(data).length} </Typography>
                <Divider />
                <GridList cellHeight="auto" cols={1} className="App-drawer--grid">
                    <GridListTile className="App-drawer--grid_tile">
                        <GridList cols={2}>
                            <GridListTile>
                                <NetworkGraph data={data}/>
                                <Divider />
                            </GridListTile>
                            <GridListTile >
                                <BuildGraph data={data}/>
                                <Divider/>
                            </GridListTile>
                            <GridListTile>
                                <UptimeGraph data={data} />
                                <Divider />
                            </GridListTile>
                            <GridListTile>
                                <ProcessGraph data={data} />
                                <Divider />
                            </GridListTile>
                        </GridList>
                    </GridListTile>
                    <GridListTile>
                        <AssetSearch data={data}/>
                        <StatsTable data={data} map={GMap}/>
                    </GridListTile>    
                </GridList>
            </Drawer>
        )
    }
}

function mapStateToProps(state) {
    return {
      state,
      GMap: state.map.GMap
    };
  }

export default connect(
      mapStateToProps,
      null,
    )(AppDrawer);