package models

import (
	"time"

	"gorm.io/gorm"
)

// Post 記事モデル
type Post struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Title     string         `json:"title" gorm:"not null"`
	Content   string         `json:"content" gorm:"type:text"`
	Slug      string         `json:"slug" gorm:"uniqueIndex;not null"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

// TableName テーブル名を指定
func (Post) TableName() string {
	return "posts"
}

