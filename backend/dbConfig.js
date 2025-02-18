import sql from 'mssql'


const config = {
    user: 'root',
    password: '12345',
    server: 'localhost',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function initializeDatabase() {
    try {
        await sql.connect(config);
        console.log('Connected to SQL Server');

        const dbCheck = await sql.query`SELECT name FROM sys.databases WHERE name = 'SentimentAnalysisDB'`;
        if (dbCheck.recordset.length === 0) {
            await sql.query`CREATE DATABASE SentimentAnalysisDB`;
            console.log('Database "SentimentAnalysisDB" created.');
        } else {
            console.log('Database "SentimentAnalysisDB" already exists.');
        }

        await sql.query`USE SentimentAnalysisDB`;

        const tableCheck = await sql.query`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'AnalysisReports'`;
        if (tableCheck.recordset.length === 0) {
            await sql.query`
                CREATE TABLE AnalysisReports (
                    ID INT PRIMARY KEY IDENTITY(1,1),
                    UserText NVARCHAR(MAX) NOT NULL,
                    Sentiment NVARCHAR(50) NOT NULL,
                    Score FLOAT NOT NULL,
                    CreatedAt DATETIME DEFAULT GETDATE()
                )
            `;
            console.log('Table "AnalysisReports" created.');
        } else {
            console.log('Table "AnalysisReports" already exists.');
        }
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await sql.close();
        console.log('Connection closed.');
    }
}

export { initializeDatabase, sql, config };