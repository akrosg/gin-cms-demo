package main

import (
	"log"
	"os"

	"gin-cms-demo/backend/database"
	"gin-cms-demo/backend/handlers"
	"gin-cms-demo/backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// データベース初期化
	db, err := database.InitDB()
	if err != nil {
		log.Fatal("データベースの初期化に失敗しました:", err)
	}

	// マイグレーション
	if err := db.DB.AutoMigrate(&models.Post{}); err != nil {
		log.Fatal("マイグレーションに失敗しました:", err)
	}

	// 開発環境ではサンプルデータを投入
	if os.Getenv("GIN_MODE") != "release" {
		seedData(db)
	}

	// Ginルーターの設定
	r := gin.Default()

	// CORS設定
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	r.Use(cors.New(config))

	// APIルート
	api := r.Group("/api")
	{
		api.GET("/posts", handlers.GetPosts)
		api.GET("/posts/:id", handlers.GetPost)
		api.POST("/posts", handlers.CreatePost)
		api.PUT("/posts/:id", handlers.UpdatePost)
		api.DELETE("/posts/:id", handlers.DeletePost)
	}

	// ヘルスチェック
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("サーバーを起動しました: http://localhost:%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("サーバーの起動に失敗しました:", err)
	}
}

// サンプルデータの投入
func seedData(db *database.DB) {
	var count int64
	db.DB.Model(&models.Post{}).Count(&count)
	if count == 0 {
		posts := []models.Post{
			{
				Title:   "Next.js 16の新機能",
				Content: "Next.js 16では、PPR（Partial Prerendering）やISR（Incremental Static Regeneration）などの新機能が追加されました。",
				Slug:    "nextjs-16-features",
			},
			{
				Title:   "Ginフレームワーク入門",
				Content: "GinはGo言語で書かれた高速なWebフレームワークです。シンプルなAPIと優れたパフォーマンスが特徴です。",
				Slug:    "gin-framework-intro",
			},
			{
				Title:   "モノリポ構成のメリット",
				Content: "モノリポ構成により、フロントエンドとバックエンドを同じリポジトリで管理でき、開発効率が向上します。",
				Slug:    "monorepo-benefits",
			},
		}
		for _, post := range posts {
			db.DB.Create(&post)
		}
		log.Println("サンプルデータを投入しました")
	}
}

