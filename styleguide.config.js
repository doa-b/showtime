module.exports = {
    components: [
        'src/components/**/*.js',
        'src/containers/**/*.js'],
    sections: [
        {
            name: 'Components',
            components: 'src/components/**/*.js',
            ignore: 'src/components/ui/**/*.js'
        },
        {
            name: 'Containers',
            components: 'src/containers/**/*.js'
        },
        {
            name: 'User Interface',
            components: 'src/components/ui/**/*.js'
        },
    ]
};


