import React, { Component } from 'react'

export default class CalendarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            googleReady: false,
            dataTable: []
        }
    }
    componentDidMount() {
        window.addEventListener("resize", this._onResize.bind(this));
        this.setState({
            dataTable: this.props.data
        })
    }
    componentWillReceiveProps(n) {
        if (n.data !== this.state.dataTable) {
            this.setState({
                dataTable: n.data
            })
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this._onResize.bind(this));
    }
    componentWillMount() {
        window.google.load('visualization', '1', {
            packages: ['calendar'],
            callback: () => {
                this.setState({ googleReady: true })
                const chart = new window.google.visualization.Calendar(this.node);
                window.google.visualization.events.addListener(chart, 'select', this._onClick.bind(this));
                this.chart = chart;
                this._drawChart();
            }
        })
    }
    render() {
        if (!this.state.googleReady) return <div>Loading</div>;
        if (this.chart) this._drawChart();
        return <div ref={el => this.node = el}></div>
    }
    _onResize = (ev) => {
        if (this.chart) this._drawChart();
    }
    _onClick = () => {
        this.props.onClick(this.chart.getSelection(), this.chart);
    }
    _drawChart = () => {
        const dataTable = new window.google.visualization.DataTable();
        dataTable.addColumn('date', 'Date')
        dataTable.addColumn('number', 'Win/Loss')
        this.state.dataTable.map((el, idx) => {
            dataTable.addRow([el.Date, el.Comparison_Type]);
            return dataTable;
        })
        const cellSize = Math.round((this.chart.getContainer().clientWidth - ((13 / 100) * this.chart.getContainer().clientWidth)) / 50);
        const height = Math.round(cellSize * 11);
        this.chart.draw(dataTable, {
            height,
            calendar: {
                cellSize,
            }
        })
    }

}