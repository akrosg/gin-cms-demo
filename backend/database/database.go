package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type DB struct {
	*gorm.DB
}

var dbInstance *DB

// InitDB データベース接続を初期化
func InitDB() (*DB, error) {
	if dbInstance != nil {
		return dbInstance, nil
	}

	db, err := gorm.Open(sqlite.Open("cms.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	dbInstance = &DB{DB: db}
	return dbInstance, nil
}

// GetDB データベースインスタンスを取得
func GetDB() *DB {
	return dbInstance
}

