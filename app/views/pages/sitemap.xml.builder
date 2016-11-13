xml.instruct! :xml, :version => "1.0"
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  
  xml.url do
      xml.loc "http://drolle.co/trends"
      #xml.lastmod tag.updated_at.to_date
      xml.changefreq "always"
      xml.priority "0.5"
    end

  for post in @post do
    xml.url do
      xml.loc post_url(post)
      xml.lastmod post.updated_at.to_date
      xml.changefreq "monthly"
      xml.priority "0.5"
    end
  end
  
  for tag in @tag do
    xml.url do
      xml.loc "http://drolle.co/tags/#{tag.name}"
      #xml.lastmod tag.updated_at.to_date
      xml.changefreq "always"
      xml.priority "0.5"
    end
  end
  
  for trend in @trend do
    xml.url do
      xml.loc "http://drolle.co/trends/#{trend.name}"
      #xml.lastmod tag.updated_at.to_date
      xml.changefreq "always"
      xml.priority "0.5"
    end
  end
  
  for user in @users do
    xml.url do
      xml.loc "http://drolle.co/user/#{user.username}"
      xml.lastmod user.updated_at.to_date
      xml.changefreq "daily"
      xml.priority "0.5"
    end
  end
  
  xml.url{
      xml.loc("http://drolle.co")
      xml.changefreq("always")
      xml.priority(1.0)
  }
  xml.url{
      xml.loc("http://drolle.co/tags")
      xml.changefreq("always")
      xml.priority(0.9)
  }
  xml.url{
      xml.loc("http://drolle.co/make")
      xml.changefreq("weekly")
      xml.priority(1.0)
  }
  xml.url{
      xml.loc("http://drolle.co/contact")
      xml.changefreq("weekly")
      xml.priority(1.0)
  }
  xml.url{
      xml.loc("http://drolle.co/about")
      xml.changefreq("weekly")
      xml.priority(1.0)
  }
  xml.url{
      xml.loc("http://drolle.co/terms")
      xml.changefreq("weekly")
      xml.priority(1.0)
  }
  
  
end