package handlers

import (
	"net/http"
	"strconv"

	"gin-cms-demo/backend/database"
	"gin-cms-demo/backend/models"

	"github.com/gin-gonic/gin"
)

// GetPosts 記事一覧を取得
func GetPosts(c *gin.Context) {
	db := database.GetDB()
	var posts []models.Post

	if err := db.DB.Order("created_at DESC").Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "記事の取得に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, posts)
}

// GetPost 記事詳細を取得
func GetPost(c *gin.Context) {
	db := database.GetDB()
	id := c.Param("id")

	var post models.Post
	if err := db.DB.Where("id = ? OR slug = ?", id, id).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "記事が見つかりませんでした"})
		return
	}

	c.JSON(http.StatusOK, post)
}

// CreatePost 記事を作成
func CreatePost(c *gin.Context) {
	db := database.GetDB()
	var post models.Post

	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if post.Slug == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "slugは必須です"})
		return
	}

	if err := db.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "記事の作成に失敗しました"})
		return
	}

	c.JSON(http.StatusCreated, post)
}

// UpdatePost 記事を更新
func UpdatePost(c *gin.Context) {
	db := database.GetDB()
	id := c.Param("id")

	var post models.Post
	if err := db.DB.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "記事が見つかりませんでした"})
		return
	}

	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.DB.Save(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "記事の更新に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, post)
}

// DeletePost 記事を削除
func DeletePost(c *gin.Context) {
	db := database.GetDB()
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "無効なIDです"})
		return
	}

	if err := db.DB.Delete(&models.Post{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "記事の削除に失敗しました"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "記事を削除しました"})
}

